/**
 * © https://github.com/jdbence/firestore-parser/blob/master/index.js
 */
const getProp = (value) => {
  const props = {
    arrayValue: 1,
    bytesValue: 1,
    booleanValue: 1,
    doubleValue: 1,
    geoPointValue: 1,
    integerValue: 1,
    mapValue: 1,
    nullValue: 1,
    referenceValue: 1,
    stringValue: 1,
    timestampValue: 1,
  };
  return Object.keys(value).find((k) => props[k] === 1);
};

/**
 * © https://github.com/jdbence/firestore-parser/blob/master/index.js
 */
const parse = (value) => {
  const prop = getProp(value);
  if (prop === "doubleValue" || prop === "integerValue") {
    value = Number(value[prop]);
  } else if (prop === "arrayValue") {
    value = (value[prop]?.values || []).map((v) => parse(v));
  } else if (prop === "mapValue") {
    value = parse(value[prop]?.fields || {});
  } else if (prop === "geoPointValue") {
    value = { latitude: 0, longitude: 0, ...value[prop] };
  } else if (prop) {
    value = value[prop];
  } else if (typeof value === "object") {
    Object.keys(value).forEach((k) => (value[k] = parse(value[k])));
  }
  return value;
};

function getId(name) {
  const paths = name.split("/");
  return paths[paths.length - 1];
}

/**
 * cf. https://firebase.google.com/docs/firestore/use-rest-api
 */
export function getAll(collection) {
  return async () => {
    const response = await fetch(
      new URL(`/${collection}`, process.env.API_URI)
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json.documents.map((document) => ({
      ...parse(document.fields),
      id: getId(document.name),
    }));
  };
}
