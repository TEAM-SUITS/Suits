const axios = require("axios");
const qs = require("qs");

module.exports = (app) => {
  app.get("/api/quote", async (req, res) => {
    // 영문 버전의 명언들 요청
    try {
      const { data: quotes } = await axios.get("https://type.fit/api/quotes");
      const randomNumber = Math.ceil(Math.random() * (quotes.length - 1));
      const quote = quotes[randomNumber];
      const { text, author } = quote;
      // 요청된 명언중에서 랜덤으로 하나 지정

      // 파파고 API에 전달할 파라미터 및 옵션 지정
      const params = qs.stringify({
        source: "en",
        target: "ko",
        text,
      });

      const options = {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-NCP-APIGW-API-KEY-ID": process.env.PAPAGO_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.PAPAGO_SECRET_ID,
        },
      };

      // 파파고 API에 변역 요청
      const response = await axios.post(
        "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation",
        params,
        options
      );
      // 변역된 text를 content, 그리고 기존의 author를 그대로 전달
      res.send({
        translated: {
          content: response.data.message.result.translatedText,
          author,
        },
        original: {
          content: text,
          author,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: "명언을 불러오는데 실패하였습니다",
      });
    }
  });
};
