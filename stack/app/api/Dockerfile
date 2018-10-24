FROM python:3.6-alpine

ENV LD_LIBRARY_PATH /usr/local/lib:/usr/lib
VOLUME ["/data", "/sock"]
EXPOSE 5000
WORKDIR "/app"
ENTRYPOINT ["python3.6", "/app/app.py"]

RUN echo "http://dl-8.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories
RUN \
    # basic deps
    apk --no-cache add openssl alpine-sdk linux-headers openssh bash gettext gnupg xz && \
    # update pip
    pip install -U pip --retries 30 && \
    # clean up apk cache
    rm -rf /var/cache/apk/*

COPY requirements.txt /app/requirements.txt

RUN \
    # install reqs
    pip install -U -r /app/requirements.txt --retries 30 && \
    # remove caches
    rm -rf /root/.cache/pip/* && \
    find /usr/local -depth \
        \( \
            \( -type d -a \( -name test -o -name tests \) \) \
            -o \
            \( -type f -a \( -name '*.pyc' -o -name '*.pyo' \) \) \
        \) -exec rm -rf '{}' +

COPY . /app/
