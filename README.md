# CV Analyzer Pro

![DevSecOps Build & Security Gate](https://github.com/Rahmatullah7866/cv-analyzer-pro/actions/workflows/devsecops.yml/badge.svg)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.2%20%7C%20DRF-092E20?logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18%20%7C%20Vite%207-61DAFB?logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)
![Ollama](https://img.shields.io/badge/LLM-Ollama%20(Local)-000000)
![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Validated-326CE5?logo=kubernetes&logoColor=white)

A privacy-first, containerized full-stack web application that evaluates resumes against job descriptions using local LLM inference via **Ollama**—keeping sensitive candidate PII off third-party cloud APIs—backed by a hardened **DevSecOps CI/CD security gate** in GitHub Actions.

---

## Architecture Overview

```text
┌─────────────────────┐      REST API (JSON)      ┌──────────────────────────────┐
│   React + Vite UI   │ ────────────────────────► │  Django 5.2 + DRF + Gunicorn │
│   (Tailwind CSS)    │ ◄──────────────────────── │  Non-root Debian Slim Image  │
└─────────────────────┘                           └──────────────┬───────────────┘
                                                                 │
                                        ┌────────────────────────┴────────────────────────┐
                                        ▼                                                 ▼
                         ┌──────────────────────────────┐                  ┌──────────────────────────────┐
                         │         MySQL 8.0            │                  │     Ollama Inference API     │
                         │  Persistent Analysis History │                  │   Local LLM (Privacy-First)  │
                         └──────────────────────────────┘                  └──────────────────────────────┘
