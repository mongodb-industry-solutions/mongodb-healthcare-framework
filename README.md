# Mongodb Healthcare Framework (MHF)

To load test data into MongoDB, download [synthea latest FHIR dataset](https://synthetichealth.github.io/synthea-sample-data/downloads/latest/synthea_sample_data_fhir_latest.zip), extract and place it inside `modules/fhir/load-data`


# Docker Container for API
```
docker build -t hc-framework .
```

```
docker run -d --name hc-framework -p 3456:3456 hc-framework
```