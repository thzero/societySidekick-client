#https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-firebase
# use latest Node LTS (Erbium)
FROM node:latest
# install Firebase CLI
RUN npm i firebase-tools@10.9.2

ENTRYPOINT ["/usr/local/bin/firebase"]
