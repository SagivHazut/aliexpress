import React, { useEffect, useState } from 'react'
import Popup from '../components/Popup'
import HandM from '../image/H_M-Logo-PNG1.png'
import '../css/button.css'
import Papa from 'papaparse'
import csvData from '../csv/Banggood_coupons.csv'
import Modal from 'react-modal'

export const HomePage = () => {
  const [parsedData, setParsedData] = useState([])

  const [coupons, setCoupons] = useState([
    {
      title: 'Under Armour',
      desc: 'Get 10% Off on Orders above the Value of AED 100',
      code: 'BH89',
      image: 'https://logowik.com/content/uploads/images/under-armour.jpg',
      href: 'https://www.underarmour.com/en-us/',
    },
    {
      title: 'Under Armour',
      desc: 'Enjoy Up to 50% off',
      code: 'AED/SAR 50',
      image: 'https://logowik.com/content/uploads/images/under-armour.jpg',
      href: 'https://www.underarmour.ae/en/trends/payday',
    },
    {
      title: 'MyProtein',
      desc: 'Changeable discount ',
      code: 'no need specified CODE',
      image: 'https://ad.admitad.com/b/nrckjiddpm5e996eb3366fd5fa82ae/',
      href: 'https://ad.admitad.com/g/nrckjiddpm5e996eb3366fd5fa82ae/?i=4',
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
      title: 'AliExpress Global',
      desc: 'US $14 off $120 code',
      code: 'JULYOT14',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://s.click.aliexpress.com/e/_DDcWu7b?bz=300*250',
      expanded: false,
      country:
        'EXCEPT RU, UZ, KR, AM, FR, ES, KZ, BR, TJ, BY, MD, AZ, TM, KG, GE, US, SA, AE, KW, OM, BH, QA',
    },
    {
      title: 'AliExpress Global',
      desc: '  US $6 off $50',
      code: 'JULYOT6',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://s.click.aliexpress.com/e/_DDcWu7b?bz=300*250',
      expanded: false,
      country:
        'EXCEPT RU, UZ, KR, AM, FR, ES, KZ, BR, TJ, BY, MD, AZ, TM, KG, GE, US, SA, AE, KW, OM, BH, QA',
    },
    {
      title: 'AliExpress Global',
      desc: 'Sale period: July 12th - 31st, 2023 PST\nUS $6 off $50 with code: US6',
      code: 'US6',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000486/tBYDExMyef?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'United States',
    },
    {
      title: 'AliExpress Global',
      desc: 'US $6 off $50 with code',
      code: 'BRAFF6',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.google.com/url?q=https://www.aliexpress.com/gcp/300000486/PeMeKGaMtY?wh_weex%3Dtrue%26tracelog%3Drowan%26rowan_id1%3Daffnl_1_en_US_2023-07-13%26rowan_msg_id%3D14efb9524e324cceabb269ca6457e829%26ck%3Din_edm_other&source=gmail&ust=1689760120280000&usg=AOvVaw05M2pKd61DLI61X_D6_cRH',
      expanded: false,
      country: 'Brazil',
    },
    {
      title: 'AliExpress Global',
      desc: 'US $10 off $100 with code',
      code: 'BRAFF10',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.google.com/url?q=https://www.aliexpress.com/gcp/300000486/PeMeKGaMtY?wh_weex%3Dtrue%26tracelog%3Drowan%26rowan_id1%3Daffnl_1_en_US_2023-07-13%26rowan_msg_id%3D14efb9524e324cceabb269ca6457e829%26ck%3Din_edm_other&source=gmail&ust=1689760120280000&usg=AOvVaw05M2pKd61DLI61X_D6_cRH',
      expanded: false,
      country: 'Brazil',
    },
    {
      title: 'AliExpress Global',
      desc: 'no need specified CODE, click the product link directly and buy it.',
      code: 'no need specified CODE',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'Brazil',
    },
    {
      title: 'AliExpress Global',
      desc: 'R$ 25,31 off R$227,77',
      code: 'KASTKINGBR5',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'Brazil',
    },
    {
      title: 'AliExpress Global',
      desc: 'R$ 45,55 off R$227,77 ',
      code: 'KASTKINGBR9',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'Brazil',
    },
    {
      title: 'AliExpress Global',
      desc: 'R$ 91.11 off R$227,77',
      code: 'KASTKINGBR18',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/campaign/wow/gcp/superdeal-g/index?tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'Brazil',
    },
    {
      title: 'AliExpress Global',
      desc: 'US $8.05 off $67.26 with code',
      code: 'JULY30',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000486/PeMeKGaMtY?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country:
        'Saudi Arabia, United Arab Emirates, Qatar, Bahrain, Oman, Kuwait',
    },
    {
      title: 'AliExpress Global',
      desc: '$6 off $50 with code',
      code: 'FR06',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000768/Gyk3MQ5mAw?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'France',
    },
    {
      title: 'AliExpress Global',
      desc: '$14 off $120 with code',
      code: 'FR14',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000768/Gyk3MQ5mAw?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'France',
    },
    {
      title: 'AliExpress Global',
      desc: '36$ off $300 with code',
      code: 'FR36',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000768/Gyk3MQ5mAw?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'France',
    },
    {
      title: 'AliExpress Global',
      desc: '  $6 dto. en compra de $50',
      code: 'ES06',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000511/europe-superdeals?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'Spain',
    },
    {
      title: 'AliExpress Global',
      desc: '$12 dto. en compra de $100:',
      code: 'ES12',
      image: 'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-icon.svg',
      href: 'https://www.aliexpress.com/gcp/300000511/europe-superdeals?wh_weex=true&tracelog=rowan&rowan_id1=affnl_1_en_US_2023-07-13&rowan_msg_id=14efb9524e324cceabb269ca6457e829&ck=in_edm_other',
      expanded: false,
      country: 'Spain',
    },
  ])
  const handleCouponClick = (index) => {
    setCoupons((prevCoupons) => {
      const updatedCoupons = prevCoupons.map((coupon, i) => {
        if (i === index) {
          return { ...coupon, expanded: !coupon.expanded }
        }
        return coupon
      })
      return updatedCoupons
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvData)
        const csv = await response.text()
        const parsedCsv = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        })
        const filteredData = parsedCsv.data.filter((item) =>
          Object.values(item).some((value) => value !== '')
        )
        setParsedData(filteredData)
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error)
      }
    }
    fetchData()
  }, [])

  const allTitles = [
    ...new Set([
      ...coupons.map((coupon) => coupon.title),
      ...parsedData.map((coupon) => coupon.advcampaign_name),
    ]),
  ]
  const [selectedTitles, setSelectedTitles] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [groupedCoupons, setGroupedCoupons] = useState({})

  useEffect(() => {
    const groupCouponsByTitle = () => {
      const grouped = {}
      ;[...parsedData, ...coupons].forEach((coupon) => {
        const { title } = coupon
        if (!grouped[title]) {
          grouped[title] = []
        }
        grouped[title].push(coupon)
      })
      setGroupedCoupons(grouped)
    }

    groupCouponsByTitle()
  }, [parsedData, coupons])

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedTitles((prevSelectedTitles) => [...prevSelectedTitles, value])
    } else {
      setSelectedTitles((prevSelectedTitles) =>
        prevSelectedTitles.filter((title) => title !== value)
      )
    }
  }

  const filteredItems = coupons
    .concat(parsedData)
    .filter(
      (item) =>
        selectedTitles.length === 0 ||
        selectedTitles.includes(item.title) ||
        selectedTitles.includes(item.advcampaign_name)
    )

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div>
        <div className={`sidebar`}>
          <button className="filter-button" onClick={openModal}>
            Filter
          </button>
        </div>
        <Popup />
        <div className={`bg-gray-100 min-h-screen`}>
          <div className="container mx-auto py-10">
            <div className={`max-w-6xl mx-auto p-8'text-gray-700`}>
              <div className="container p-8">
                <h1 className="text-3xl font-bold mb-4">Coupon Codes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 shadow-md"
                    >
                      <h2 className="text-xl font-bold mb-2">
                        {item.title || item.advcampaign_name}
                      </h2>
                      <a href={item.href || item.gotolink} target="_blank">
                        <img
                          src={item.image || item.logo}
                          alt=""
                          className="mx-auto  mb-2"
                        />
                      </a>

                      <p
                        className={`text-gray-600 mb-4 ${
                          item.expanded
                            ? 'max-h-none'
                            : 'max-h-12 overflow-hidden'
                        }`}
                      >
                        {item.desc || item.name}
                      </p>

                      <p className="text-blue-600 font-semibold mb-2">
                        Code:
                        <br />
                        <span className="text-red-400">
                          {item.code || item.promocode}
                        </span>
                      </p>
                      {item.country && (
                        <button
                          onClick={() => handleCouponClick(index)}
                          className="text-blue-600 font-semibold underline mb-2"
                        >
                          {item.expanded ? 'Hide Country' : 'Show Country'}
                        </button>
                      )}
                      {item.expanded && <p>Country: {item.country}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-4 right-4"></div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content ">
          <h3 className="text-xl font-semibold mb-4">Filter</h3>
          <div className="grid grid-cols-2 gap-10">
            {allTitles.map((title) => (
              <label key={title} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  value={title}
                  checked={selectedTitles.includes(title)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm text-gray-800">{title}</span>
              </label>
            ))}
          </div>
          <button
            className="modal-close-button mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  )
}
