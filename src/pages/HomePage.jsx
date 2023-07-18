import React, { useState } from 'react'
import Popup from '../components/Popup'
import HandM from '../image/H_M-Logo-PNG1.png'
import '../css/button.css'

export const HomePage = () => {
  const [coupons, setCoupons] = useState([
    {
      title: 'Under Armour',
      desc: 'Get 10% Off on Orders above the Value of AED 100',
      code: 'BH89',
      image: 'https://logowik.com/content/uploads/images/under-armour.jpg',
      href: 'https://www.underarmour.com/en-us/',
    },
    {
      title: 'American Eagle',
      desc: 'Get Up to 8% OFF on Everything',
      code: 'DQN0',
      image:
        'https://logowik.com/content/uploads/images/american-eagle-outfitters-wordmark6734.logowik.com.webp',
      href: 'https://www.ae.com/intl/en',
    },
    {
      title: 'H&M',
      desc: 'H&M 20% OFF Coupons',
      code: 'D427',
      image: HandM,
      href: 'https://www.hm.com/hw_il/index.html',
    },
    {
      title: 'AliExpress',
      desc: 'US $14 off $120 code',
      code: 'JULYOT14',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://s.click.aliexpress.com/e/_DDcWu7b?bz=300*250',
      country:
        'EXCEPT RU, UZ, KR, AM, FR, ES, KZ, BR, TJ, BY, MD, AZ, TM, KG, GE, US, SA, AE, KW, OM, BH, QA',
    },
    {
      title: 'AliExpress',
      desc: '  US $6 off $50',
      code: 'JULYOT6',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://s.click.aliexpress.com/e/_DDcWu7b?bz=300*250',
      country:
        'EXCEPT RU, UZ, KR, AM, FR, ES, KZ, BR, TJ, BY, MD, AZ, TM, KG, GE, US, SA, AE, KW, OM, BH, QA',
    },
    {
      title: 'AliExpress',
      desc: 'Sale period: July 12th - 31st, 2023 PST\nUS $6 off $50 with code: US6',
      code: 'US6',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000486/tBYDExMyef?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'United States',
    },
    {
      title: 'AliExpress',
      desc: 'US $6 off $50 with code',
      code: 'BRAFF6',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.google.com/url?q=https://www.aliexpress.com/gcp/300000486/PeMeKGaMtY?wh_weex%3Dtrue%26tracelog%3Drowan%26rowan_id1%3Daffnl_1_en_US_2023-07-13%26rowan_msg_id%3D14efb9524e324cceabb269ca6457e829%26ck%3Din_edm_other&source=gmail&ust=1689760120280000&usg=AOvVaw05M2pKd61DLI61X_D6_cRH',
      country: 'Brazil',
    },
    {
      title: 'AliExpress',
      desc: 'US $10 off $100 with code',
      code: 'BRAFF10',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.google.com/url?q=https://www.aliexpress.com/gcp/300000486/PeMeKGaMtY?wh_weex%3Dtrue%26tracelog%3Drowan%26rowan_id1%3Daffnl_1_en_US_2023-07-13%26rowan_msg_id%3D14efb9524e324cceabb269ca6457e829%26ck%3Din_edm_other&source=gmail&ust=1689760120280000&usg=AOvVaw05M2pKd61DLI61X_D6_cRH',
      country: 'Brazil',
    },
    {
      title: 'AliExpress',
      desc: 'no need specified CODE, click the product link directly and buy it.',
      code: 'no need specified CODE',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'Brazil',
    },
    {
      title: 'AliExpress',
      desc: 'R$ 25,31 off R$227,77',
      code: 'KASTKINGBR5',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'Brazil',
    },
    {
      title: 'AliExpress',
      desc: 'R$ 45,55 off R$227,77 ',
      code: 'KASTKINGBR9',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'Brazil',
    },
    {
      title: 'AliExpress',
      desc: 'R$ 91.11 off R$227,77',
      code: 'KASTKINGBR18',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'Brazil',
    },
    {
      title: 'AliExpress',
      desc: 'US $8.05 off $67.26 with code',
      code: 'JULY30',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000486/PeMeKGaMtY?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country:
        'Saudi Arabia, United Arab Emirates, Qatar, Bahrain, Oman, Kuwait',
    },
    {
      title: 'AliExpress',
      desc: '$6 off $50 with code',
      code: 'FR06',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000768/Gyk3MQ5mAw?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'France',
    },
    {
      title: 'AliExpress',
      desc: '$14 off $120 with code',
      code: 'FR14',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000768/Gyk3MQ5mAw?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'France',
    },
    {
      title: 'AliExpress',
      desc: '36$ off $300 with code',
      code: 'FR36',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000768/Gyk3MQ5mAw?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'France',
    },
    {
      title: 'AliExpress',
      desc: '  $6 dto. en compra de $50',
      code: 'ES06',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000511/europe-superdeals?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'Spain',
    },
    {
      title: 'AliExpress',
      desc: '$12 dto. en compra de $100:',
      code: 'ES12',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000511/europe-superdeals?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      country: 'Spain',
    },
  ])

  return (
    <>
      <Popup />
      <div className={`bg-gray-100 min-h-screen`}>
        <div className="container mx-auto py-10">
          <div className={`max-w-4xl mx-auto p-8'text-gray-700`}>
            <div className="container p-8">
              <h1 className="text-3xl font-bold mb-4">Coupon Codes</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-md"
                  >
                    <h2 className="text-xl font-bold mb-2">{coupon.title}</h2>
                    <img src={coupon.image} alt="" className="mx-auto  mb-2" />
                    <p
                      className={`text-gray-600 mb-4 ${
                        coupon.expanded
                          ? 'max-h-none'
                          : 'max-h-12 overflow-hidden'
                      }`}
                    >
                      {coupon.desc}
                    </p>

                    <p className="text-blue-600 font-semibold mb-2">
                      Code:
                      <br />
                      <span className="text-red-400">{coupon.code}</span>
                    </p>
                    <a
                      href={coupon.href}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      Go to Website
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4"></div>
      </div>
    </>
  )
}
