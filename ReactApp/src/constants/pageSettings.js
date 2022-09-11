export const PAGE_SIZE = 20

export const DEFAULT_QUERY = {
    "op": "must",
    "filters": [
    ],
    "order": {
      "field": "created_at",
      "type": "DESC"
    },
    "size": {
      "page_number": 1,
      "page_size": PAGE_SIZE
    }
  }