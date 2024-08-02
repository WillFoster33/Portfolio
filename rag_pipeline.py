import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

load_dotenv()




OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') 
DOC_PATH = "./Willfosterresume2024.pdf"  
CHROMA_PATH = os.path.join(os.path.dirname(__file__), "chroma_db")


# Load your PDF document
loader = PyPDFLoader(DOC_PATH)
pages = loader.load()

# Split the document into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(pages)

# Get OpenAI Embedding model
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

# Embed the chunks as vectors and load them into the database
db_chroma = Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_PATH)

def answer_query(query):
    # Retrieve context - top 5 most relevant chunks to the query vector
    docs_chroma = db_chroma.similarity_search_with_score(query, k=5)

    # Generate an answer based on the given user query and retrieved context information
    context_text = "\n\n".join([doc.page_content for doc, _score in docs_chroma])

    # Define the prompt template
    PROMPT_TEMPLATE = """
    Answer the question based only on the following context:
    {context}.
    Answer the question based on the above context: {question}.
    Provide a detailed answer.
    Don't justify your answers.
    Don't give information not mentioned in the CONTEXT INFORMATION.
    Do not say "according to the context" or "mentioned in the context" or similar.
    My name is Will Foster and i have built you to act as the AI version of me.
    You are supposed to asnwer the questions as if you are Will Foster.
    Answer in the first person as if you are Will Foster.
    The information you have knowledge on is limited to the information you have. 
    You are not to assume any information that you do not have information about.
    You must be very kind and respectful in your responses.
    Respond in the first person as if you are Will Foster.
    You cannot speculate on any information you do not have.
    If it is not in the context, you do not know if it it true.
    You are not an assistant, you are me.
    """

    # Load retrieved context and user query in the prompt template
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query)

    # Call LLM model to generate the answer based on the given context and query
    model = ChatOpenAI()
    response_text = model.invoke(prompt)

    return response_text.content