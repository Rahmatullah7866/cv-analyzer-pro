# Multi-stage hardened build on Debian Bookworm Slim
FROM debian:bookworm-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-venv \
    python3-dev \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv --without-pip /opt/venv \
    && apt-get update && apt-get install -y --no-install-recommends curl \
    && curl -sS https://bootstrap.pypa.io/get-pip.py | /opt/venv/bin/python \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip "setuptools>=78.1.1" "wheel>=0.46.2" \
    && pip install --no-cache-dir -r requirements.txt

# Final Runtime Stage
FROM debian:bookworm-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    libmariadb3 \
    && rm -rf /var/lib/apt/lists/*

# Non-root user setup
RUN useradd -m -u 1000 appuser && \
    mkdir -p /app/staticfiles /app/media && \
    chown -R appuser:appuser /app

WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "--timeout", "300", "core.wsgi:application"]