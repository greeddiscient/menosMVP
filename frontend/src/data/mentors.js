"use strict";

const mentors = [

  {
    'id': 'yos-ginting',
    'name': 'Yos Ginting',
    'image': 'yos-ginting.jpg',
    'cover': 'yos-ginting-cover.jpg',
    'position':'Board Member',
    'company':'H.M.Sampoerna',
    'background': 'Yos Adiguna Ginting began his career as manager for strategic alliances at PT Indah Kiat Pulp and Paper. He earned a Ph.D. in theoretical chemistry at the University of Tasmania in Australia in 1997. Mr. Ginting was eventually appointed to the position of vice president for trade alliances based in Singapore. He joined PT Hanjaya Mandala Sampoerna in April 2002, and was named director of human resources in June 2003. In 2008, Mr. Ginting was appointed director in charge of corporate affairs.',
    'education':'Ph.D in Theoretical Chemisty - University of Tasmania',
    'story':'',
  },



  {
    'id': 'stephanie-hermawan',
    'name': 'Stephanie Hermawan',
    'image': 'stephanie-hermawan.jpg',
    'cover': 'stephanie-hermawan-cover.png',
    'position':'Founder',
    'company':'Sankalp Forum',
    'background': 'Stephanie Hermawan was initially very successful in building the first forward thinking furniture company of Indonesia, Arbor & Troy. She focused on building furnitures tailored to her taste. Having graduated from University of Michigan Ann Arbor, Stephanie Hermawan focused on building American design furnitures which the Indonesian market took a great liking to. Stephanie Hermawan has since then holds multiple advisory positions in various startups.',
    'education':'UNSW',
    'story':'',
  },
  {
    'id': 'jefrey-joe',
    'name': 'Jefrey Joe',
    'image': 'jefrey-joe.jpg',
    'cover': 'jefrey-joe-cover.jpg',
    'position':'Managing Partner',
    'company':'Alpha JWC Ventures',
    'background': 'Jefrey was an active angel investor in early-stage technology startups in Asia and the US, including aCommerce (South East Asia\'s leading e-commerce fulfillment company), Shopline (mobile focused DIY e-commerce store based in HK which was invested by Alibaba), and Vantage Sports (the premier analytics service for NBA players, teams, and media). ',
    'education':'Masters in Business Administration - UCLA',
    'story':'',
  },
  {
    'id': 'shinta-kamdani',
    'name': 'Shinta Kamdani',
    'image': 'shinta-kamdani.jpg',
    'cover': 'shinta-kamdani-cover.jpg',
    'position':'Managing Director',
    'company':'Sintesa Group',
    'background': 'Born into a family of entrepreneurs, Shinta Kamdani learned business from her father, Johnny Widjaja, and grandfather, Oey Kim Tjiang. Sintesa, started as a rubber plantation called Tigaraksa in 1919, is now one of the nation’s largest distributors of consumer products. Through Sintesa, Shinta Kamdani controls 17 companies involved in industries as diverse as property, manufacturing, energy and consumer products.',
    'education':'Bachelors in Psychology - Barnard Columbia',
    'story':'',
  },

  {
    'id': 'sukan-makmuri',
    'name': 'Sukan Makmuri',
    'image': 'sukan-makmuri.jpg',
    'cover': 'sukan-makmuri-cover.png',
    'position':'CTO',
    'company':'Kudo',
    'background': 'For over 20 years Sukan Makmuri honed his business, product management, finance, and technology skills in several startups in Silicon Valley, as a senior consultant to major corporations, and as Vice President of Internet Banking Technology at Bank of America. In the last few years, numerous startups & incubators in Silicon Valley and SE Asia has also benefited from his strategic and detailed mentoring.',
    'education':'Masters in Engineering Management - Stanford University',
    'story':'',
  },
  {
    'id': 'pahala-mansury',
    'name': 'Pahala Mansury',
    'image': 'pahala-mansury.jpg',
    'cover': 'pahala-mansury-cover.jpg',
    'position':'President Director',
    'company':'Garuda Indonesia',
    'background': 'Pahala Mansury served as the Managing Director of Finance & Strategy at Bank Mandiri and was awarded The Best CFO in Indonesia. He currently serves as the President and Director of Garuda Indonesia, Indonesia\'s flagship airlines. Pahala Mansury holds a Bachelors Degree in Accounting from University of Indonesia and then went on to a prestigious finance program at New York University Stern School of Business where he holds a Masters of Business Administration.',
    'education':'Bachelors in Accounting - Universitas Indonesia Masters of Business Administration - New York University ',
    'story':'',
  },
  {
    'id': 'diono-nurjadin',
    'name': 'Diono Nurjadin',
    'image': 'diono-nurjadin.jpg',
    'cover': 'diono-nurjadin-cover.png',
    'position':'President & CEO',
    'company':'Cardig Aero Services',
    'background': 'Diono Nurjadin is one of the country’s leading businessmen. He is the President and CEO of PT Cardig International and the President Commissioner of PT Jasa Angkasa Semesta. Diono was previously a Directo at Peregrine Securities in Singapore and a Vice President at Bankers Trust in Singapore. He holds an MBA from Pace University and a Bachelor’s degree from Rochester University. He returned to Jakarta in 1994 where he was involved in a successful securities firm for two years before joining the family business.',
    'education':"Bachelor Degree - Rochester University MBA - Pace University",
    'story':'',
  },
  {
    'id': 'noni-purnomo',
    'name': 'Noni Purnomo',
    'image': 'noni-purnomo.jpg',
    'cover': 'noni-purnomo-cover.jpg',
    'position':'President Director',
    'company':'Blue Bird Group',
    'background': 'Noni Purnomo was groomed as a successor to her father, H. Purnomo Prawiro, president director of this taxi, logistics and property company founded by her grandmother in 1972 with 25 cabs; today it has 26,000. Noni Purnomo followed in her mother\'s footprints as a woman in a traditionally male-dominated industry.',
    'education':'Industrial Engineering - University of Newcastle Masters in Marketing & Finance - University of San Francisco',
    'story':'',
  },
  {
    'id': 'novistiar-rustandi',
    'name': 'Novistiar Rustandi',
    'image': 'novistiar-rustandi.jpg',
    'cover': 'novistiar-rustandi-cover.png',
    'position':'CEO',
    'company':'HarukaEDU',
    'background': 'Novistiar Rustandi is an entrepreneur with a passion for internet startups and digital businesses. Novistiar Rustandi has worked in management roles at Price Waterhouse Coopers in the United States as well as Indonesis. He serves as Director at Founder Institute, Incorporated. He earned an undergraduate accounting degree, as well as dual master’s degrees in business administration and information systems development from George Washington University, and is a graduate of the inaugural semester of the Founder Institute in Silicon Valley.',
    'education':'The George Washington University',
    'story':'',
  },
  {
    'id': 'handry-satriago',
    'name': 'Handry Satriago',
    'image': 'handry-satriago.jpg',
    'cover': 'handry-satriago-cover.jpg',
    'position':'CEO',
    'company':'General Electric Indonesia',
    'background': 'Handry Satriago (born in Riau, Pekanbaru on June 13, 1969) is the CEO of General Electric Indonesia. He joined the company in 1997 as Business Development Manager. Prior to joining GE he worked for several local companies as head of business development. Handry Satriago is very passionate about pushing the Indonesian race forward and can be seen all over Indonesia giving talks and seminars, inspiring the next generation of Indonesians.',
    'education':'Bogor Agricultural University (IPB)',
    'story':'',
  },
  {
    'id': 'eli-schwartz',
    'name': 'Eli Schwartz',
    'image': 'eli-schwartz.jpg',
    'cover': 'eli-schwartz-cover.jpg',
    'position':'Director of Marketing',
    'company':'SurveyMonkey',
    'background': 'Eli Schwartz is currently the Director of International Marketing at SurveyMonkey where he leads marketing and go-to-market strategies for the company’s top-tier global markets. Prior to his current role, he was the Director of Marketing, APAC based in Singapore. Eli is a frequent guest author on marketing industry sites like SearchEngineLand, MarketingLand, and SearchEngineJournal. He has also published marketing expertise in Stanford’s Asia Center blog, the Y Combinator blog, Hubspot, and HuffingtonPost among many other websites. ',
    'education':'Masters of Business Administration - University of Baltimore',
    'story':'',
  },
  {
    'id': 'ananda-siregar',
    'name': 'Ananda Siregar',
    'image': 'ananda-siregar.jpg',
    'cover': 'ananda-siregar-cover.jpg',
    'position':'Founder',
    'company':'Blitz Megaplex',
    'background': 'Ananda Siregar is Founder of Blitz Megaplex, a major movie theatre chain in Indonesia. He is also Founder of the Global Entrepreneurship Program, a non-profit organization that promotes entrepreneurship in Indonesia. Previously, Ananda Siregar worked in banking at Citibank and SalomonSmithBarney. He also worked with the Indonesian Bank Restructuring Agency (IBRA). Ananda Siregar has a degree in Psychology and Economics from Northwestern University in the United States.',
    'education':'Psychology & Economics - Northwestern University',
    'story':'',
  },
  {
    'id': 'derice-sumantri',
    'name': 'Derice Sumantri',
    'image': 'derice-sumantri.jpg',
    'cover': 'derice-sumantri-cover.jpg',
    'position':'Head of Healthcare Division',
    'company':'Royal Progress',
    'background': 'Progress Group is a family owned company in real estate township development, healthcare, agriculture, outdoor advertising and petrol industry that began in Wollongong and Sydney Australia in 1978 and expanded into Indonesia in 1982. Derice Sumantri is an avid soccer fan. Not only does she keep up to date with the latest soccer news, she was also a Division I player in college. Derice Sumantri believes that the strategy, skill, mindseti t, and teamwork in athletics transfers over to the workplace.',
    'education':'Bachelor of Commerce - University of Sydney',
    'story':'',
  },
  {
    'id': 'anne-sutanto',
    'name': 'Anne Sutanto',
    'image': 'anne-sutanto.jpg',
    'cover': 'anne-sutanto-cover.jpg',
    'position':'Vice President Director',
    'company':'Pan Brothers',
    'background': 'Anne Patricia Sutanto has been Vice President Director of PT. Pan Brothers Tbk, since June 22, 2010 and served as its President Commissioner since 2009. Mrs. Sutanto\'s previous experience includes prominent positions in the business development department of Kayu Lapis Group from 1995 to 1996 and the Assistant Finance Director of the Keris Group from 1996 to 1997. She has been a Director of PT. Pan Brothers Tbk, since 1997. She has been President Commissioner at PT Bumi Teknokultura Unggul Tbk since June 2012. She serves as Director of PT. Pancaprima Ekabrothers and PB International BV. She Completed education at University of Southern California, USA, majoring in Chemical Engineering and minor Business Administration in 1992. Mrs. Sutanto holds a Master of Business Administration (MBA) specializing in finance from Loyola Marymount University, Los Angeles, USA in 1994.',
    'education':'Chemical Engineering - University of Southern California MBA - Loyola Marymount University',
    'story':'',
  },

  {
    'id': 'aldrin-tando',
    'name': 'Aldrin Tando',
    'image': 'aldrin-tando.png',
    'cover': 'aldrin-tando-cover.png',
    'position':'President & CEO',
    'company':'Aldiron Hero Group',
    'background': 'Aldrin Tando is the President and CEO of Aldiron Hero Group, a diversified corporation with businesses in multiple industries such as real estate, mining, agriculture and security. In addition to running the corporation, Aldrin is also an active contributing member of the Young Presidents’ Organisation (YPO) and the Indonesia Chamber of Commerce and Industry (KADIN)',
    'education':'Engineering - University of Washington Masters - UCLA',
    'story':'',
  },









];

export default mentors;

// name company title education background story
