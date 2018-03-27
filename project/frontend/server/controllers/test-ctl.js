const test = {

  getPGTAbleData( ctx , next ) {
    ctx.body = {
      "success" : "true" ,
      "msg" : "操作成功" ,
      "result" : {
        "total":11,
        "rows":[
          {
            "id":1,
            "pkey": "key1",
            "pvalue": "value1",
            "pdescr": "aaaa"
          },
          {
            "id":2,
            "pkey": "key2",
            "pvalue": "value2",
            "pdescr": "bbb"
          },
          {
            "id":3,
            "pkey": "key3",
            "pvalue": "value3",
            "pdescr": "ccc"
          },{
            "id":4,
            "pkey": "key4",
            "pvalue": "value4",
            "pdescr": "ddd"
          },{
            "id":5,
            "pkey": "key5",
            "pvalue": "value5",
            "pdescr": "eee"
          },{
            "id":6,
            "pkey": "key6",
            "pvalue": "value6",
            "pdescr": "fff"
          },{
            "id":7,
            "pkey": "key7",
            "pvalue": "value7",
            "pdescr": "ggg"
          },{
            "id":8,
            "pkey": "key8",
            "pvalue": "value8",
            "pdescr": "ooo"
          },{
            "id":9,
            "pkey": "key9",
            "pvalue": "value9",
            "pdescr": "ppp"
          },{
            "id":10,
            "pkey": "key10",
            "pvalue": "value10",
            "pdescr": "ssss"
          },{
            "id":11,
            "pkey": "key11",
            "pvalue": "value11",
            "pdescr": "rrr"
          }
        ],
      }
    }
  } ,

};

module.exports = test;