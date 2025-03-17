import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const ExchangeRates = () => {
  const navigate = useNavigate();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'https://api.exchangerate-api.com/v4/latest/INR';  // Example API URL (INR base)

  // Currency code to country code mapping
  const currencyToCountry = {
    AED: 'AE',  // United Arab Emirates Dirham
    AFN: 'AF',  // Afghan Afghani
    ALL: 'AL',  // Albanian Lek
    AMD: 'AM',  // Armenian Dram
    ANG: 'AW',  // Netherlands Antillean Guilder
    AOA: 'AO',  // Angolan Kwanza
    ARS: 'AR',  // Argentine Peso
    AUD: 'AU',  // Australian Dollar
    AWG: 'AW',  // Aruban Florin
    AZN: 'AZ',  // Azerbaijani Manat
    BAM: 'BA',  // Bosnian Convertible Mark
    BBD: 'BB',  // Barbadian Dollar
    BDT: 'BD',  // Bangladeshi Taka
    BGN: 'BG',  // Bulgarian Lev
    BHD: 'BH',  // Bahraini Dinar
    BIF: 'BI',  // Burundian Franc
    BMD: 'BM',  // Bermudian Dollar
    BND: 'BN',  // Brunei Dollar
    BOB: 'BO',  // Bolivian Boliviano
    BRL: 'BR',  // Brazilian Real
    BSD: 'BS',  // Bahamian Dollar
    BTN: 'BT',  // Bhutanese Ngultrum
    BWP: 'BW',  // Botswanan Pula
    BYN: 'BY',  // Belarusian Ruble
    BZD: 'BZ',  // Belize Dollar
    CAD: 'CA',  // Canadian Dollar
    CDF: 'CD',  // Congolese Franc
    CHF: 'CH',  // Swiss Franc
    CLP: 'CL',  // Chilean Peso
    CNY: 'CN',  // Chinese Yuan
    COP: 'CO',  // Colombian Peso
    CRC: 'CR',  // Costa Rican Colón
    CUP: 'CU',  // Cuban Peso
    CVE: 'CV',  // Cape Verdean Escudo
    CZK: 'CZ',  // Czech Koruna
    DJF: 'DJ',  // Djiboutian Franc
    DKK: 'DK',  // Danish Krone
    DOP: 'DO',  // Dominican Peso
    DZD: 'DZ',  // Algerian Dinar
    EGP: 'EG',  // Egyptian Pound
    ERN: 'ER',  // Eritrean Nakfa
    ETB: 'ET',  // Ethiopian Birr
    EUR: 'EU',  // Euro (Multiple countries)
    FJD: 'FJ',  // Fijian Dollar
    FKP: 'FK',  // Falkland Islands Pound
    FOK: 'FO',  // Faroese Króna
    GBP: 'GB',  // British Pound
    GEL: 'GE',  // Georgian Lari
    GGP: 'GG',  // Guernsey Pound
    GHS: 'GH',  // Ghanaian Cedi
    GIP: 'GI',  // Gibraltarian Pound
    GMD: 'GM',  // Gambian Dalasi
    GNF: 'GN',  // Guinean Franc
    GTQ: 'GT',  // Guatemalan Quetzal
    GYD: 'GY',  // Guyanese Dollar
    HKD: 'HK',  // Hong Kong Dollar
    HNL: 'HN',  // Honduran Lempira
    HRK: 'HR',  // Croatian Kuna
    HTG: 'HT',  // Haitian Gourde
    HUF: 'HU',  // Hungarian Forint
    IDR: 'ID',  // Indonesian Rupiah
    ILS: 'IL',  // Israeli New Shekel
    IMP: 'IM',  // Isle of Man Pound
    IQD: 'IQ',  // Iraqi Dinar
    IRR: 'IR',  // Iranian Rial
    ISK: 'IS',  // Icelandic Króna
    JEP: 'JE',  // Jersey Pound
    JMD: 'JM',  // Jamaican Dollar
    JOD: 'JO',  // Jordanian Dinar
    JPY: 'JP',  // Japanese Yen
    KES: 'KE',  // Kenyan Shilling
    KGS: 'KG',  // Kyrgyzstani Som
    KHR: 'KH',  // Cambodian Riel
    KID: 'KI',  // Kiribati Dollar
    KMF: 'KM',  // Comorian Franc
    KRW: 'KR',  // South Korean Won
    KWD: 'KW',  // Kuwaiti Dinar
    KYD: 'KY',  // Cayman Islands Dollar
    KZT: 'KZ',  // Kazakhstani Tenge
    LAK: 'LA',  // Laotian Kip
    LBP: 'LB',  // Lebanese Pound
    LKR: 'LK',  // Sri Lankan Rupee
    LRD: 'LR',  // Liberian Dollar
    LSL: 'LS',  // Lesotho Loti
    LYD: 'LY',  // Libyan Dinar
    MAD: 'MA',  // Moroccan Dirham
    MDL: 'MD',  // Moldovan Leu
    MGA: 'MG',  // Malagasy Ariary
    MKD: 'MK',  // Macedonian Denar
    MMK: 'MM',  // Myanmar Kyat
    MNT: 'MN',  // Mongolian Tögrög
    MOP: 'MO',  // Macanese Pataca
    MRU: 'MR',  // Mauritanian Ouguiya
    MUR: 'MU',  // Mauritian Rupee
    MVR: 'MV',  // Maldivian Rufiyaa
    MWK: 'MW',  // Malawian Kwacha
    MXN: 'MX',  // Mexican Peso
    MYR: 'MY',  // Malaysian Ringgit
    MZN: 'MZ',  // Mozambican Metical
    NAD: 'NA',  // Namibian Dollar
    NGN: 'NG',  // Nigerian Naira
    NIO: 'NI',  // Nicaraguan Córdoba
    NOK: 'NO',  // Norwegian Krone
    NPR: 'NP',  // Nepalese Rupee
    NZD: 'NZ',  // New Zealand Dollar
    OMR: 'OM',  // Omani Rial
    PAB: 'PA',  // Panamanian Balboa
    PEN: 'PE',  // Peruvian Nuevo Sol
    PGK: 'PG',  // Papua New Guinean Kina
    PHP: 'PH',  // Philippine Peso
    PKR: 'PK',  // Pakistani Rupee
    PLN: 'PL',  // Polish Zloty
    PYG: 'PY',  // Paraguayan Guarani
    QAR: 'QA',  // Qatari Rial
    RON: 'RO',  // Romanian Leu
    RSD: 'RS',  // Serbian Dinar
    RUB: 'RU',  // Russian Ruble
    RWF: 'RW',  // Rwandan Franc
    SAR: 'SA',  // Saudi Riyal
    SBD: 'SB',  // Solomon Islands Dollar
    SCR: 'SC',  // Seychellois Rupee
    SDG: 'SD',  // Sudanese Pound
    SEK: 'SE',  // Swedish Krona
    SGD: 'SG',  // Singapore Dollar
    SHP: 'SH',  // Saint Helena Pound
    SLE: 'SL',  // Sierra Leonean Leone
    SLL: 'SL',  // Sierra Leonean Leone
    SOS: 'SO',  // Somali Shilling
    SRD: 'SR',  // Surinamese Dollar
    SSP: 'SS',  // South Sudanese Pound
    STN: 'ST',  // São Tomé and Príncipe Dobra
    SYP: 'SY',  // Syrian Pound
    SZL: 'SZ',  // Swazi Lilangeni
    THB: 'TH',  // Thai Baht
    TJS: 'TJ',  // Tajikistani Somoni
    TMT: 'TM',  // Turkmenistan Manat
    TND: 'TN',  // Tunisian Dinar
    TOP: 'TO',  // Tongan Paʻ
    INR: 'IN'
  };

  const handleSeeMoreClick = () => {
    // Prepare rates data with flags included
    const ratesWithFlags = Object.entries(rates).map(([currency, rate]) => {
      const countryCode = currencyToCountry[currency]?.toLowerCase() || 'unknown';
      const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
      return { currency, rate, flagUrl };
    });
  
    navigate('/exchange', { state: { rates: ratesWithFlags } });
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setRates(data.rates);  
      } catch (err) {
        setError(err.message);  
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();  // Call the fetch function
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Get the first 4 rates
  const firstFourRates = Object.entries(rates).slice(0, 4);

  return (
    <div className="exchange-rates-div">
      <div className="flex">
        <p className="op-t-1">EXCHANGE RATE</p>
        <p onClick={handleSeeMoreClick} className="red">
          SEE MORE &gt;
        </p>
      </div>
      <div className="rates-list">
  {firstFourRates.map(([currency, rate]) => {
    const countryCode = currencyToCountry[currency]?.toLowerCase() || 'unknown';
    const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;

    return (
      <div key={currency} className="rate-item">
        <div className="rate-info">
          <img src={flagUrl} alt={`${currency} flag`} className="currency-flag" />
          <p className="txt-1">{currency}: {rate}</p>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default ExchangeRates;