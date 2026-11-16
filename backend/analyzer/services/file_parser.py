import io
from pypdf import PdfReader
from docx import Document
from .security import validate_magic_bytes, sanitize_prompt_injection

def extract_text_from_file(uploaded_file) -> str:
    """
    Validates magic bytes and extracts plain text from PDF or DOCX.
    """
    file_type = validate_magic_bytes(uploaded_file)
    extracted_text = []

    if file_type == 'pdf':
        reader = PdfReader(io.BytesIO(uploaded_file.read()))
        uploaded_file.seek(0)
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text.append(text)
    elif file_type == 'docx':
        doc = Document(io.BytesIO(uploaded_file.read()))
        uploaded_file.seek(0)
        for p in doc.paragraphs:
            if p.text:
                extracted_text.append(p.text)

    combined_text = "\n".join(extracted_text)
    return sanitize_prompt_injection(combined_text)