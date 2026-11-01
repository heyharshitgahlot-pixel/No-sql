# Task 11: MongoDB primary-secondary replication
This local three-member replica set demonstrates primary election and failover. Run `docker compose up -d`, initiate the set with the command below, wait for one PRIMARY and two SECONDARY members, then stop the primary and inspect `rs.status()` again. A configuration file alone is not proof of failover.

`docker exec mongo-rs1 mongosh --eval "rs.initiate({_id:'rs0',members:[{_id:0,host:'rs1:27017'},{_id:1,host:'rs2:27017'},{_id:2,host:'rs3:27017'}]})"`
