# AI能力调用参考

使用Moonshot AI的API，参考如下代码：

```javascript
const OpenAI = require("openai");
 
const client = new OpenAI({
    apiKey: "$MOONSHOT_API_KEY",    
    baseURL: "https://api.moonshot.cn/v1",
});
 
async function main() {
    const completion = await client.chat.completions.create({
        model: "kimi-k2-0711-preview",         
        messages: [ 
            {role: "system", content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
            {role: "user", content: "你好，我叫李雷，1+1等于多少？"}
        ],
        temperature: 0.6
    });
    console.log(completion.choices[0].message.content);
}
 
main();
```