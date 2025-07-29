library(plumber)
library(xgboost)
library(dplyr)
library(zoo)  # For moving average

# Load model
model <- xgb.load("xgb_model.model")

#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    res$setHeader("Access-Control-Allow-Headers", "Content-Type")
    return(res)
  } else {
    forward()
  }
}

#* @post /predict
#* @serializer json
function(req, res) {
  tryCatch({
    # Read CSV from request body
    csv_data <- read.csv(text = req$postBody)

    # Ensure Variant is treated as character
    csv_data$Variant <- as.character(csv_data$Variant)

    # Get unique variants
    variants <- unique(csv_data$Variant)
    results <- list()

    for (variant in variants) {
      # Filter by variant
      variant_data <- csv_data %>% filter(Variant == variant)

      # Average numeric columns only
      avg_row <- variant_data %>%
        summarise(across(where(is.numeric), ~ mean(.x, na.rm = TRUE)))

      pred_list <- data.frame(DOC = seq(10, 120, by = 10), PredictedGrowth = NA)

      for (i in seq_along(pred_list$DOC)) {
        d <- pred_list$DOC[i]

        # Create prediction row
        future_row <- avg_row
        future_row$DOC <- d  # Set future DOC

        # Select numeric columns only
        numeric_matrix <- future_row %>%
          dplyr::select(where(is.numeric)) %>%
          as.matrix()

        # Predict
        pred_list$PredictedGrowth[i] <- predict(model, numeric_matrix)[1]
      }

      # Apply moving average smoothing (window = 3)
      roll_vals <- rollmean(pred_list$PredictedGrowth, k = 3, fill = "extend", align = "center")

          # Check if the result has the same number of rows
          if (length(roll_vals) == nrow(pred_list)) {
            pred_list$SmoothedGrowth <- roll_vals
          } else {
            cat("Rollmean output size doesn't match rows. Using original predictions.\n")
            pred_list$SmoothedGrowth <- pred_list$PredictedGrowth
          }


      # Append smoothed results to final output
      for (i in seq_len(nrow(pred_list))) {
        results <- append(results, list(list(
          Variant = variant,
          DOC = pred_list$DOC[i],
          PredictedGrowth = round(pred_list$SmoothedGrowth[i], 2)
        )))
      }
    }

    list(status = "success", predictions = results)

  }, error = function(e) {
    print(paste("ERROR:", e$message))
    res$status <- 500
    list(error = e$message)
  })
}
