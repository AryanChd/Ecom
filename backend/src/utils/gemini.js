import axios from "axios";

const gemini = async (product) => {
  const data = {
    contents: [
      {
        parts: [
          {
            text: `Give me a short discription of a product ${product.productName} with category ${product.category} `,
          },
        ],
      },
    ],
  };

  let result;
  try {
    result = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      JSON.stringify(data),
      {
        headers: {
          "x-goog-api-key": process.env.GEMINI_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error(error.response?.data || error.message);
  }

  if (result && result.data) {
    return result.data.candidates[0].content.parts[0].text;
  } else {
    throw new Error("Error to create data from gemini !! ");
  }
};

export { gemini };
