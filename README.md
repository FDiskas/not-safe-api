# Not safe for children

Node express API - will check if it is not a safe place for children.
It checks if it is an adult site or not.

```
GET ?site=https://google.com
```

Returns a status `TRUE` if unsafe and `FALSE` if it is safe for browsing.

```json
{
  "url": "google.com",
  "status": false
}
```

### Dependencies

- the main package is `is-porn`
