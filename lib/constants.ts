// ВНИМАНИЕ: адрес ИП на сайте НЕ публикуется (требование комплаенса)
export const COMPANY = {
  name: 'ИП Чурсин Евгений Валентинович',
  inn: '781109486616',
  ogrn: '326784700254015',
  email: 'eugtch@yandex.ru',
  phone: '+7 (921) 908-57-97',
  bank: 'АО «БАНК ПСК», БИК 044030832',
  ks: '30101810800000000832',
  rs: '40802810200000254001',
}

export const OFFER_VERSION = 'Редакция от 03 августа 2026 г.'

export const PAYMENT_DESCRIPTION = (userId: string) =>
  `Оплата ИТ-услуг по Агентской оферте (ID пользователя № ${userId}), в том числе Агентское вознаграждение 3%. НДС не облагается.`

export const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU')