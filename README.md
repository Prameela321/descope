# descope
![descope_jwt_template](https://github.com/user-attachments/assets/6edb9eea-c0a7-489e-8070-2124c4a9bc42)

1.project creation in descope
2. add custom jwt  claim  by using setup jwt template 
 sample 
{
  "amr": "[list-of-strings-of-identifiers-used]",
  "drn": "[string-of-type-of-token]",
  "exp": "[timestamp-of-expiration-time]",
  "iat": "[timestamp-of-issued-time]",
  "iss": "P2xmZ6o36U02wn4PDWZ59KoixPcg",
  "sub": "[string-of-user-id]",
  "roles": "[list-of-strings] //project level",
  "permissions": "[list-of-strings] //project level",
  "tenants": {
    "[tenantId]": {
      "roles": "[list-of-strings] //tenant level",
      "permissions": "[list-of-strings] //tenant level"
    }
  },
  "escape": "room"
}
3.clone the responsitory from 
https://github.com/descope-sample-apps/descope-escape-room
4.add authprovider to your app using doc and authenticate
