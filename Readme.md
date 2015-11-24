## Running on Deis

First login and create an app if not already created. `usergrid-portal-prod` should already exist.

### CDP US
If the app doesnt' exist:

    DEIS_PROFILE=cdp-us deis create usergrid-portal-prod --no-remote
    DEIS_PROFILE=cdp-us deis git:remote -r deis-prod-us -a usergrid-portal-prod

Update configs:

    DEIS_PROFILE=cdp-us deis config:push -p ./.cdp-us.env

Deploy:

    git push deis-prod-us master


### CDP EU
If the app doesnt' exist:

    DEIS_PROFILE=cdp-eu deis create usergrid-portal-prod --no-remote
    DEIS_PROFILE=cdp-eu deis git:remote -r deis-prod-eu -a usergrid-portal-prod

Update configs:

    DEIS_PROFILE=cdp-eu deis config:push -p ./.cdp-eu.env

Deploy:

    git push deis-prod-eu master

