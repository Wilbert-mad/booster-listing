import advertisementData from './advertisementData';

export default interface memberShema {
  id: string,
  advertisements: [advertisementData],
  advertiser: boolean
}