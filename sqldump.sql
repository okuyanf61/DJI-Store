-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Anamakine: db
-- Üretim Zamanı: 22 May 2022, 08:18:26
-- Sunucu sürümü: 5.7.37
-- PHP Sürümü: 8.0.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Veritabanı: `mfoshop`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

CREATE TABLE `products` (
                            `product_id` int(11) NOT NULL,
                            `product_name` text NOT NULL,
                            `product_price` int(11) NOT NULL,
                            `product_description` text NOT NULL,
                            `product_category` text NOT NULL,
                            `product_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `product_description`, `product_category`, `product_image`) VALUES
                                                                                                                                       (1, 'DJI FPV Combo', 5389, 'DJI FPV turns your aerial imagination into reality. With this immersive, intuitive, and ready-to-fly FPV system, get ready to go into the beyond.', 'FPV Experience', 'images/fpv.png'),
                                                                                                                                       (2, 'Inspire 2', 62000, 'Image quality, power and intelligence to meet the needs of professional filmmakers and enterprises around the globe.', 'Aerial Cinematic', 'images/inspire2.png'),
                                                                                                                                       (3, 'DJI Mavic 3', 38402, 'Mavic 3 comes with a 4/3 CMOS Hasselblad camera and is equipped with obstacle sensing and Advanced RTH.', 'Aerial Photography', 'images/mavic3.png'),
                                                                                                                                       (4, 'DJI Mavic Air', 5999, 'Mavic Air takes power and portability to the next level, offering advanced features in a compact form factor.', 'Aerial Photography', 'images/mavicair.png'),
                                                                                                                                       (5, 'DJI Mini 2', 7999, 'Small but mighty, DJI Mini 2 features 4K videos, 4x Zoom, and stunning panoramas, allowing you to explore a whole new perspective.', 'Aerial Photography', 'images/mini2.png'),
                                                                                                                                       (6, 'DJI Mini SE', 5389, 'The ultra-compact DJI Mini SE is the perfect companion for adventure. With a 30-min flight time and easy-to-use app, it\'s ideal for beginners.', 'Aerial Photography', 'images/minise.png'),
(7, 'Phantom 4 Pro V2.0', 67000, '1-inch 20MP Exmor R CMOS sensor, longer flight time and smarter features.', 'Aerial Photography', 'images/phantom4pro.png'),
(8, 'SPARK', 7495, 'Meet Spark, a mini drone that features all of DJI\'s signature technologies, allowing you to seize the moment whenever you feel inspired. With intelligent flight control options, a mechanical gimbal, and a camera with incredible image quality, Spark empowers you to push your creative boundaries.', 'Aerial Photography', 'images/spark.png');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
                         `user_id` int(11) NOT NULL,
                         `user_name` text NOT NULL,
                         `user_surname` text NOT NULL,
                         `user_email` text NOT NULL,
                         `user_password` text NOT NULL,
                         `user_gender` text,
                         `user_website` text,
                         `user_is_admin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_surname`, `user_email`, `user_password`, `user_gender`, `user_website`, `user_is_admin`) VALUES
                                                                                                                                                (1, 'admin', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', NULL, NULL, 1),
                                                                                                                                                (2, 'Mehmet Fatih', 'Okuyan', 'okuyanf6161@gmail.com', '32deac770a0b457d652945367934e48f', 'Male', 'https://mehmetfatih.com', 0);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
    ADD PRIMARY KEY (`product_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
    MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
    MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
