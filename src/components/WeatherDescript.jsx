import PropTypes from "prop-types";

const WeatherDescript = (prompt, weatherData) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const sysMsg = `In a conservational professional tone, answer the [Question] based on the [Weather Data].

-Provide an opinion about what the weather feels like.
-Provide temperature in either the Celsius or Fahrenheit, whichever is more appropriate.
- Never display the temperature in Kelvin.
- Provide a recommendation about how to prepare and what to wear (e.g., bring an umbrella, wear a windbreaker, a warm jacket, etc.)`;

  const newPrompt = `Question: ${prompt}. Weather Data: ${JSON.stringify(
    weatherData
  )}`;
  const data = {
    model: "gpt-4-0613",
    // messages: [{ role: "user", content: prompt }],
    messages: [
      { role: "system", sysMsg },
      { role: "user", content: newPrompt },
    ],
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      // const promptRes = JSON.parse(
      //   data.choices[0].message.function_call.arguments
      // );
      console.log(data);
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to identify a location from your question. Please try again."
      );
    });
};

WeatherDescript.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default WeatherDescript;
