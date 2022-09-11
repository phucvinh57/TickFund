export const PAGE_SIZE = 10

export const DEFAULT_TRANSACTION_QUERY = {
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

export const DEFAULT_PLANNING_QUERY = {
    "op": "must",
    "filters": [
    ],
    "order": {
      "field": "next_due",
      "type": "DESC"
    },
    "size": {
      "page_number": 1,
      "page_size": PAGE_SIZE
    }
}