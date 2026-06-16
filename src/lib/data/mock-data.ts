export const MOCK_PROVIDERS = [
  { id: 'p-ringgo',     name: 'RingGo',     slug: 'ringgo',     logo_text: 'RGo', deeplink_ios: 'ringgo://pay?locationCode={zone_code}',         web_fallback_url: 'https://www.ringgo.co.uk/' },
  { id: 'p-paybyphone', name: 'PayByPhone', slug: 'paybyphone', logo_text: 'PBP', deeplink_ios: 'paybyphone://parking?locationNumber={zone_code}', web_fallback_url: 'https://m.paybyphone.com/' },
  { id: 'p-ncp',        name: 'NCP',        slug: 'ncp',        logo_text: 'NCP', deeplink_ios: 'ncp://carpark/{zone_code}',                      web_fallback_url: 'https://www.ncp.co.uk/' },
  { id: 'p-qpark',      name: 'Q-Park',     slug: 'qpark',      logo_text: 'Q',   deeplink_ios: 'qpark://location/{zone_code}',                   web_fallback_url: 'https://www.q-park.co.uk/en-gb/' },
  { id: 'p-justpark',   name: 'JustPark',   slug: 'justpark',   logo_text: 'JP',  deeplink_ios: 'justpark://location/{zone_code}',                web_fallback_url: 'https://www.justpark.com/' },
] as const

export const MOCK_LOCATIONS = [
  { id: 'l-1', name: 'Great Maze Pond',       type: 'on_street',    lat: 51.5040, lng: -0.0897, address: 'Great Maze Pond, London SE1 9RT', postcode: 'SE1 9RT', provider_slug: 'ringgo',     zone_code: 'SOUTHWARK · 36417', confidence_score: 96, covered: false, ev_spaces: 0, disabled_spaces: 2, price_per_hour_pence: 330, daily_max_pence: 1800, max_stay_minutes: 240 },
  { id: 'l-2', name: 'NCP Snowsfields',       type: 'multi_storey', lat: 51.5022, lng: -0.0882, address: 'Snowsfields, London SE1 3SS',     postcode: 'SE1 3SS', provider_slug: 'ncp',        zone_code: 'SNOW001',          confidence_score: 90, covered: true,  ev_spaces: 4, disabled_spaces: 6, price_per_hour_pence: 420, daily_max_pence: 2400, max_stay_minutes: null },
  { id: 'l-3', name: 'Q-Park London Bridge',  type: 'multi_storey', lat: 51.5045, lng: -0.0863, address: 'Fenning St, London SE1 9EH',      postcode: 'SE1 9EH', provider_slug: 'qpark',      zone_code: 'QPLB001',          confidence_score: 92, covered: true,  ev_spaces: 6, disabled_spaces: 8, price_per_hour_pence: 500, daily_max_pence: 3000, max_stay_minutes: null },
  { id: 'l-4', name: 'Driveway · Bermondsey', type: 'private',      lat: 51.5008, lng: -0.0851, address: 'Bermondsey St, London SE1 3UW',   postcode: 'SE1 3UW', provider_slug: 'justpark',   zone_code: 'JP-BMSY-12',       confidence_score: 80, covered: false, ev_spaces: 1, disabled_spaces: 0, price_per_hour_pence: 250, daily_max_pence: 1400, max_stay_minutes: null },
  { id: 'l-5', name: 'Tooley Street Bays',    type: 'on_street',    lat: 51.5031, lng: -0.0815, address: 'Tooley St, London SE1 2QF',       postcode: 'SE1 2QF', provider_slug: 'paybyphone', zone_code: 'SOUTHWARK · 36402', confidence_score: 88, covered: false, ev_spaces: 0, disabled_spaces: 1, price_per_hour_pence: 360, daily_max_pence: 2000, max_stay_minutes: 240 },
] as const
