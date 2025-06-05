window.watsonAssistantChatOptions = {
  integrationID: "dfc640a0-9acd-4ab6-9e62-b280cfbef052", // The ID of this integration.
  region: "au-syd", // The region your integration is hosted in.
  serviceInstanceID: "ff4d6cf2-d614-4423-9361-0356dac78784", // The ID of your service instance.
  onLoad: async (instance) => {
    await instance.render();
  },
};
setTimeout(function () {
  const t = document.createElement("script");
  t.src =
    "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
    (window.watsonAssistantChatOptions.clientVersion || "latest") +
    "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});
