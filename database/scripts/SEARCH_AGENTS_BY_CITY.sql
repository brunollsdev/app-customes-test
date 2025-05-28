SELECT agents.* FROM agents
INNER JOIN address ON agents.address_id = address.id
WHERE
    address.city = :city;