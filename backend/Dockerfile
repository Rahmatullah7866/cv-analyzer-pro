FROM python:3.11-slim AS builder

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir --upgrade pip "setuptools>=78.1.1" "wheel>=0.46.2"

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir --upgrade pip "setuptools>=78.1.1" "wheel>=0.46.2" "jaraco.context>=6.1.0" \
    && rm -rf /usr/local/lib/python3.11/ensurepip/_bundled \
    && find / -name "*setuptools-70.3.0*" -exec rm -rf {} + 2>/dev/null || true

RUN useradd -m -u 1000 appuser && \
    mkdir -p /app/staticfiles /app/media && \
    chown -R appuser:appuser /app

COPY --from=builder /root/.local /home/appuser/.local
COPY --chown=appuser:appuser . .

USER appuser
ENV PATH=/home/appuser/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "--timeout", "300", "core.wsgi:application"]