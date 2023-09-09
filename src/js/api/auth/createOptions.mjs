export default function createOptions(method = "GET", bodyData = null, headers = {}) {
   const options = {
      method,
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         ...headers,
      },
   };

   if (bodyData) {
      options.body =JSON.stringify(bodyData);
   }

   return options;
}