export function resetObjectValues(obj: any): any {
  let newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key !== "id" && key !== "createdAt") {
        console.log(key)
        // Exclude keys with the name 'id'
        switch (typeof obj[key].dataType) {
          case "string":
            newObj[key] = "";
            break;
          case "number":
            newObj[key] = 0;
            break;
          case "boolean":
            newObj[key] = false;
            break;
          // Handle other types if needed
          default:
            // For unknown types, preserve the original value
            newObj[key] = obj[key];
            break;
        }
      } else {
      }
    }
  }
  return newObj;
}
