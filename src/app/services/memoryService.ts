import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { VectorDBQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export class MemoryService {
  llmModel: ChatOllama;
  embeddingsModel: OllamaEmbeddings;
  vectorStore: MemoryVectorStore;
  chain: VectorDBQAChain;

  constructor() {
    // specify LLM model
    this.llmModel = new ChatOllama({
      model: "llama3.1",
      temperature: 0,
      maxRetries: 2,
      // other params...
    });

    // specify embeddings model
    this.embeddingsModel = new OllamaEmbeddings({
      model: "nomic-embed-text",
      baseUrl: "http://localhost:11434",
    });

    // create vector store by combining OpenSearch store with the embeddings model
    this.vectorStore = new MemoryVectorStore(this.embeddingsModel);

    // combine the LLM model and the vector store to get a chain
    this.chain = VectorDBQAChain.fromLLM(this.llmModel, this.vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });
  }

  async storeMemory(memory: string) {
    // Package a memory in a document
    const doc = new Document({
      pageContent: memory,
    });

    await this.vectorStore.addDocuments([doc]);

    // console.log('Document indexed successfully:', doc);
  }

  async getRelevantMemory(query: string) {
    const response = await this.chain.call({ query });
    return response.text;
  }
}
