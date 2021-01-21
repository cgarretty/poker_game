#!/bin/bash

coverage run --source='.' --omit='*/env/*','htmlcov','tests/*' -m pytest  && \
coverage html && \
coverage report -m
