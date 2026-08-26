-- A-FRAME STAYS seed data (az)
DELETE FROM blocked_dates;
DELETE FROM houses;

INSERT INTO houses (id, title, description, region, daily_price, guests, features, images, lat, lng) VALUES
(
  'a1111111-1111-4111-8111-111111111111',
  'Şahdağ Panorama Lodge',
  'Şahdağın ətəyində, qarlı zirvələrə baxan premium A-Frame. Geniş panoramik pəncərə qarşısında isti kamin, əl işi taxta mebel və sakitlik gözləyir. Qış aylarında xizək mərkəzinə 15 dəqiqəlik məsafədədir.

Hər səhər dağ çayı səsi ilə oyanacaq, axşamlar ulduzların altında barbekü zonasında istirahət edəcəksiniz.',
  'Qusar',
  240,
  6,
  '["Wi-Fi", "Kamin", "Dağ Mənzərəsi", "Barbekü Zonası", "Parkinq", "İsti Su", "Tam Mətbəx", "Smart TV"]'::jsonb,
  '["https://images.pexels.com/photos/34923430/pexels-photo-34923430.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/6552568/pexels-photo-6552568.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/12730495/pexels-photo-12730495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]'::jsonb,
  41.4275,
  48.4302
),
(
  'b2222222-2222-4222-8222-222222222222',
  'Meşə Səsi A-Frame',
  'Qəbələnin sıx şam meşəsinin içində gizlənmiş, tam özəl A-Frame. Üçbucaqlı fasadın boydan-boya şüşəsi meşəni birbaşa qonaq otağına dəvət edir.

Tufandağa 10 dəqiqə, Nohur gölünə isə 20 dəqiqəlik yoldur. Səhər qəhvənizi güldamlası suyu ilə, axşam çayınızı kamin qarşısında için.',
  'Qəbələ',
  190,
  4,
  '["Wi-Fi", "Kamin", "Meşə Mənzərəsi", "Cakuzi", "Tam Mətbəx", "Parkinq", "İsti Su", "Heyvanlara İcazə"]'::jsonb,
  '["https://images.pexels.com/photos/9211814/pexels-photo-9211814.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/5810797/pexels-photo-5810797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/33640978/pexels-photo-33640978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/28920388/pexels-photo-28920388.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"]'::jsonb,
  40.9814,
  47.8459
),
(
  'c3333333-3333-4333-8333-333333333333',
  'Çaykənarı Retreat',
  'İsmayıllının yaşıl təpələri arasında, dağ çayının kənarında romantik A-Frame gizlənib. Çayın səsi təbii fital musiqi kimi hər otağa daxil olur.

Balıqçılıq, piyada marşrutları və Lahıc kəndinə günübirlik səfərlər üçün ideal başlanğıc nöqtəsidir.',
  'İsmayıllı',
  160,
  4,
  '["Wi-Fi", "Kamin", "Barbekü Zonası", "Meşə Mənzərəsi", "Parkinq", "Tam Mətbəx", "İsti Su"]'::jsonb,
  '["https://images.pexels.com/photos/33694567/pexels-photo-33694567.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/38495291/pexels-photo-38495291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/18091484/pexels-photo-18091484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/7041770/pexels-photo-7041770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]'::jsonb,
  40.7901,
  48.1519
),
(
  'd4444444-4444-4444-8444-444444444444',
  'Qırmızı Dam Retreat',
  'Qubanın alma bağları ilə əhatə olunmuş, qırmızı damlı klassik A-Frame. Geniş həyət, manqal zonası və uşaqlar üçün təhlükəsiz oyun sahəsi ailələr üçün idealdır.

Ectokay — yaxınlıqda məşhur çay şirəsi dükanları, Afurca şəlaləsinə isə 30 dəqiqəlik sürətli yol var.',
  'Quba',
  210,
  6,
  '["Wi-Fi", "Kamin", "Barbekü Zonası", "Dağ Mənzərəsi", "Parkinq", "Kondisioner", "Smart TV", "Paltaryuyan"]'::jsonb,
  '["https://images.pexels.com/photos/7071955/pexels-photo-7071955.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/31331266/pexels-photo-31331266.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/7746106/pexels-photo-7746106.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/31854904/pexels-photo-31854904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]'::jsonb,
  41.3597,
  48.5124
),
(
  'e5555555-5555-4555-8555-555555555555',
  'Tufandağ Skyline',
  'Tufandağ yamacında yerləşən ən yüksək baxış nöqtəli A-Frame-lərimizdən biri. Panoramik yataq otağı pəncərəsindən bulaq sakitliyi və şəhər işıqları bir arada görünür.

Dizayn minimalist, materiallar təbii: taxta, daş və yun. Cakuzi və geniş terras gün batımını tamaşa etmək üçün nəzərdə tutulub.',
  'Qəbələ',
  260,
  5,
  '["Wi-Fi", "Kamin", "Cakuzi", "Dağ Mənzərəsi", "Kondisioner", "Tam Mətbəx", "Parkinq", "Səhər Yeməyi"]'::jsonb,
  '["https://images.pexels.com/photos/34923429/pexels-photo-34923429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/6803507/pexels-photo-6803507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/31854903/pexels-photo-31854903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/27641249/pexels-photo-27641249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]'::jsonb,
  40.9962,
  47.8567
),
(
  'f6666666-6666-4666-8666-666666666666',
  'Dağüstü Hideaway',
  'Şəkinin qış yolu üstündə, dumanlı sıldırımlar arasında sürreal A-Frame sığınacağı. Burada zaman yavaşlayır: kitab, kamin və duman rəqsi.

Kiş kəndi və Şəki Xan Sarayı yaxınlıqdadır. Yolun sonuncu 500 metri makadamdır — səyahətin özü də macəradır.',
  'Şəki',
  175,
  3,
  '["Wi-Fi", "Kamin", "Dağ Mənzərəsi", "Meşə Mənzərəsi", "Parkinq", "İsti Su", "Heyvanlara İcazə"]'::jsonb,
  '["https://images.pexels.com/photos/38855502/pexels-photo-38855502.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/9209889/pexels-photo-9209889.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/29546724/pexels-photo-29546724.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", "https://images.pexels.com/photos/6832351/pexels-photo-6832351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]'::jsonb,
  41.1975,
  47.1706
);

-- Nümunə bloklanmış günlər (həmişə gələcək tarixlər)
INSERT INTO blocked_dates (house_id, start_date, end_date) VALUES
  ('b2222222-2222-4222-8222-222222222222', CURRENT_DATE + 4, CURRENT_DATE + 7),
  ('b2222222-2222-4222-8222-222222222222', CURRENT_DATE + 15, CURRENT_DATE + 16),
  ('e5555555-5555-4555-8555-555555555555', CURRENT_DATE + 2, CURRENT_DATE + 5),
  ('a1111111-1111-4111-8111-111111111111', CURRENT_DATE + 10, CURRENT_DATE + 12),
  ('f6666666-6666-4666-8666-666666666666', CURRENT_DATE + 6, CURRENT_DATE + 8);
