SELECT agents.*, address.city FROM agents
INNER JOIN address ON agents.address_id = address.id
WHERE
    address.city IN (
        SELECT address.city FROM customers
        LEFT JOIN address ON customers.address_id = address.id
        WHERE
            customers.id = :customerId
    );