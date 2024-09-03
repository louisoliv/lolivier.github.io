export const query1 = {
  query: `{
  user {
    id
    firstName
    lastName
    login
    email
    campus
    auditRatio
    totalUp
    totalDown
    events {
     xp {
      amount
      path
      user {
        id
        login
      	}
    	}
    }
    transactions {
      amount
      userId
      path
      createdAt
      attrs
      progress {
        grade
        path
        
      }
    }
    
  }
}`,
};

export const query2 = {
  query: `{
  user {
    transactions {
      type
      amount
      userId
      path 
      createdAt
      }
    } 
  }`,
};

export const query3 = {
  query: `{
  user {
    transactions(order_by: {createdAt: asc}) {
      type
      amount
      userId
      path
      createdAt
    }
  }
  }`,
};

export const query4 = {
  query: `{
  user {
    id
    attrs
  }
  }`,
};
