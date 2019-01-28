export interface card {
  id: string,
  number: number,
  state: string,
}
export interface conditions {
  publicCards: card[],
  maximamNumber: number,
  myCard: card,
  myLowerNumberCard?: card,
  teammateCard: card,
}
export interface decision {
  decision: string,
  card?: any
}
export interface record {
  name: string,
  time: string,
}