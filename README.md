# MongoDB Healthcare API  
  
Welcome to the MongoDB Healthcare API! This API provides functionality for FHIR and OpenEHR operations, offering robust healthcare data management within applications.  

## Environment Variables Setup

Configure your application by setting the following environment variables:  

```
MONGO_ATLAS_URI=""
DATABASE_NAME=""
```

## Loading Test Data into MongoDB (Optional)  
  
To begin working with the API, you need to load test data into MongoDB. Follow these steps:  
  
1. Download the [latest FHIR dataset from Synthea](https://synthetichealth.github.io/synthea-sample-data/downloads/latest/synthea_sample_data_fhir_latest.zip).  
2. Extract the downloaded file.  
3. Place the extracted dataset inside the `modules/fhir/load-data` directory of your project.
4. Run `fhir-load-data-multiple` or `fhir-load-data-single`

## Running the API  
  
To run the API locally, execute the following commands in your terminal:  
  
1. Install the required npm packages:  
  
    ```bash  
    npm install  
    ``` 
  
2. Start the API:  
  
    ```bash  
    npm run api  
    ``` 
  
3. Open your browser and navigate to [http://localhost:3456/api/docs](http://localhost:3456/api/docs) to view the OpenAPI documentation.  
  
## Docker Container for API  
  
For containerized environments, you can create and run a Docker container using the steps below:  
  
1. Build the Docker image:  
  
    ```bash  
    docker build -t hc-framework .  
    ``` 
  
2. Run the Docker container:  
  
    ```bash  
    docker run -d --name hc-framework -p 3456:3456 hc-framework  
    ```  
  
## FHIR Operations  
  
The system supports various FHIR operations for interacting with healthcare resources. The supported operations are outlined below:  
  
| Feature             | Supported |  
| ------------------- | --------- |  
| Create              | ✅        |  
| Read                | ✅        |  
| Update              | ✅        |  
| Delete              | ✅        |  
| VRead               | ❌        |  
| History (Instance)  | ❌        |  
| History (Type)      | ❌        |  
| Search (Type)       | ❌        |  
| Patch               | ❌        |  
| Validate            | ❌        |  
| Everything          | ❌        |  
  
## OpenEHR Routes  
  
The API provides several routes for OpenEHR operations:  
  
- **Store Template:** Stores a template in ADL format.    
  `POST /api/openehr/v1/ehr/definition/template/adl1.4`  
  
- **Store Composition:** Stores a composition for a specific EHR.    
  `POST /api/openehr/v1/ehr/:ehrId/composition`  
  
- **Get Composition:** Retrieves a specific composition using EHR and composition IDs.    
  `GET /api/openehr/v1/ehr/:ehrId/composition/:compositionId`  
  
- **Create EHR:** Creates an Electronic Health Record (EHR).    
  `PUT /api/openehr/v1/ehr/:ehrId`  
  
## Organization of Code  
  
Inside the `src` folder and the `api` folder, you will find a `routes` directory. This folder contains all route definitions for FHIR and OpenEHR operations, helping you navigate through different functionalities provided by the API.  
  
Feel free to explore the codebase, and make use of the routes and APIs to integrate healthcare data management into your applications effectively!  
