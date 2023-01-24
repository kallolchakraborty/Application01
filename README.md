# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Notes

1. `cds init application_name` : to initilize the project
To move the application running from the IDE to the CF(moving from SQL Lite db to HANA): 
    1. `cds add hana` or `cds add hana --force` to add the hana db
    2. `cds buils/all` to build the project. folder `gen` is created. `db` contains the `db` artifacts. `srv` contains the `service` artifacts.
        `db/src/manifest.yaml` - it is the way of cf to deploy apps.
    3. `cds add cf-manifest` : creates two files, a manifest.yml and services-manifest.yml in the project root folder. 
        https://cap.cloud.sap/docs/guides/deployment/to-cf#add-manifest
    4. `cf create-service hana hdi-shared service-manifest-generate-service-name` to create the hana service. can be created from the UI by using the services.
    

    5. to run the application locally using the hana db, bind the application first using the tab of BAS `cloud foundry targets` then select the `services`. 
        In that there will be the service. Right-click on it & bind the app using the root folder of app.
        `.env` file will be created as a result of this & will contain the `VCAP_SERVICES` details.
        rename the `.env` file to `default-env.json`
        format it to `.json` format. add {} at the beginning & end & add "" to `VCAP_SERVICES` to look like "VCAP_SERVICES": {...
        this file is mock environment variable

    6. `npm i` to install the node modules
    7. `cds watch` to run the app locally
    8. `npm i bcryptjs` for 


