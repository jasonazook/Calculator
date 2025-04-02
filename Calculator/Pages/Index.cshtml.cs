using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data;

namespace Calculator.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public string Input { get; set; } = string.Empty;

        public string Result { get; set; } = string.Empty;

        public string ErrorMessage { get; set; } = string.Empty;

        public void OnGet()
        {
            // Initial page load
        }

        public void OnPost()
        {
            try
            {
                if (!string.IsNullOrEmpty(Input))
                {
                    // Replace × with * and ÷ with / for calculation
                    string expression = Input.Replace('×', '*').Replace('÷', '/');

                    // Validate the expression
                    if (IsValidExpression(expression))
                    {
                        // Calculate the result using DataTable.Compute
                        DataTable dt = new DataTable();
                        var result = dt.Compute(expression, "");

                        // Handle division by zero
                        if (double.IsInfinity(Convert.ToDouble(result)))
                        {
                            ErrorMessage = "Error: Division by zero is not allowed.";
                            Result = string.Empty;
                        }
                        else
                        {
                            Result = result.ToString() ?? "Error";
                            ErrorMessage = string.Empty;
                        }
                    }
                    else
                    {
                        ErrorMessage = "Invalid expression. Please check your input.";
                        Result = string.Empty;
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Error: {ex.Message}";
                Result = string.Empty;
            }
        }

        private bool IsValidExpression(string expression)
        {
            // Simple validation to ensure the expression contains only valid characters
            return System.Text.RegularExpressions.Regex.IsMatch(expression, @"^[0-9+\-*/.()\s]*$");
        }
    }
}
