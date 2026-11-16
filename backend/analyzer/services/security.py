import io
import re
from django.core.exceptions import ValidationError

# Magic Bytes definitions
PDF_MAGIC_BYTE = b'%PDF-'
DOCX_MAGIC_BYTE = b'PK\x03\x04'

def validate_magic_bytes(uploaded_file) -> str:
    """
    Validates binary file signature to protect against extension spoofing.
    """
    uploaded_file.seek(0)
    header = uploaded_file.read(8)
    uploaded_file.seek(0)

    if header.startswith(PDF_MAGIC_BYTE):
        return 'pdf'
    elif header.startswith(DOCX_MAGIC_BYTE):
        return 'docx'
    else:
        raise ValidationError("File signature rejected. Only authentic PDF or DOCX files are permitted.")

def sanitize_prompt_injection(raw_text: str) -> str:
    """
    Strips zero-width characters, dangerous jailbreak phrases, and normalizes text.
    """
    if not raw_text:
        return ""
    
    # Strip zero-width unicode spaces/delimiters
    clean_text = re.sub(r'[\u200B-\u200D\uFEFF]', '', raw_text)
    
    # Neutralize common LLM prompt override payloads
    dangerous_patterns = [
        r'(?i)ignore\s+(all\s+)?(previous|prior)\s+instructions',
        r'(?i)you\s+are\s+now\s+in\s+developer\s+mode',
        r'(?i)system\s*:\s*override',
        r'(?i)output\s+100\s*(/\s*100|percent)',
    ]
    for pattern in dangerous_patterns:
        clean_text = re.sub(pattern, '[FLAGGED UNTRUSTED TEXT REMOVED]', clean_text)

    return clean_text.strip()