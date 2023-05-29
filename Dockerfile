FROM python
RUN pip install --upgrade pip
RUN pip3 install Flask gunicorn
COPY . .
RUN pip3 install -r requirements.txt
RUN python wordHandler.py
ENV PORT 80
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 1 app:app --timeout 3600