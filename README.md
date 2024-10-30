# Kozmetički Salon - Projekat

Dobrodošli u projekat kozmetičkog salona! Ovaj repozitorijum sadrži aplikaciju koja omogućava korisnicima da pregledaju usluge, zakazuju termine i pristupe informacijama o salonu.

## Pokretanje Projekta na Lokalnoj Mašini

Pratite sledeće korake da biste preuzeli i pokrenuli projekat lokalno:

composer install
php artisan serve

npm install
npm start

## Tehnologije

Frontend: React, React Router, Axios, Chart.js
Backend: Laravel, Maatwebsite Excel
Baza podataka: MySQL
Eksterni API: Pexels API za prikaz slika

## Korišćenje aplikacije
### Prijava i Registracija
Registracija: Novi korisnici mogu kreirati nalog popunjavanjem obrasca za registraciju.Nakon uspešne registracije, korisnik će biti obavešten putem modalnog prozora i biće preusmeren na stranicu za prijavu.
Prijava: Korisnici unose svoj email i lozinku da bi se prijavili. Ako korisnik ima administratorske privilegije, aplikacija će ga automatski prepoznati kao administratora.
### Funkcionalnosti za korisnike
Pregled usluga: Nakon prijave, korisnici mogu pregledati listu dostupnih kozmetičkih usluga sa detaljima o opisu i ceni.
Zakazivanje termina: Korisnici mogu odabrati uslugu, zaposlenog i vreme, a zatim zakazati termin. Nakon uspešnog zakazivanja, korisnik dobija potvrdu.
Pregled zakazanih termina: Prikazuje listu svih zakazanih termina korisnika sa opcijama za otkazivanje ili izmenu termina.
### Administratorske funkcionalnosti
Upravljanje korisnicima: Administrator može pregledati listu svih korisnika u sistemu, otvoriti detalje korisnika (prikaz u modalnom prozoru) ili obrisati korisnika.
Analitički prikaz - Metrike:
Ukupan broj zakazanih termina: Prikazuje ukupan broj termina zakazanih u salonu.
Broj termina po zaposlenom: Bar grafikon prikazuje koliko termina je zakazano kod svakog zaposlenog.
Cena usluga: Doughnut grafikon vizualizuje cene svih kozmetičkih usluga koje salon nudi.
Eksport u CSV: Administrator može preuzeti CSV fajl sa detaljima o uslugama, što je korisno za vođenje evidencije i dalju analizu.
### Vizuelni prikazi i grafikoni
Grafikoni: U sekciji sa metrike, administrator može vizualizovati podatke pomoću grafikona (broj zakazanih termina po zaposlenom i pregled cena usluga).
Eksterni API: Prikazivanje slika vezanih za kozmetičke usluge preuzetih putem Pexels API-ja, što doprinosi atraktivnom korisničkom iskustvu.

### Autor
Marija Bakic

