# Data models

## Recipe Database

---

### Recipe Structure

| name        | type   | unique | optional |
| ----------- | ------ | ------ | -------- |
| id          | int    | yes    | no       |
| name        | string | yes    | no       |
| prep_time   | string | no     | no       |
| picture_url | string | no     | no       |
| servings    | int    | no     | no       |
| account_id  | int    | no     | no       |
| accounts    | FK     | no     | no       |
| tags        | FK     | no     | no       |

The `recipe` entity contains the data about a specific recipe
that a user can view or edit.
