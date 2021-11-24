const emptyFields = (rq, rs, reqFields) => {
  let emptyFlds = [];

  for (const field of reqFields) {
    if (!rq.body[field] ) {
      emptyFlds.push(field);
    }
  }

  if (emptyFlds.length > 0) {
    // console.log(emptyFlds);

    return rs.status(400).json({ 
      status: 'failed', 
      message: `The following fields: '${emptyFlds.join(', ')}' are required` 
    });
  }
}

export default emptyFields;