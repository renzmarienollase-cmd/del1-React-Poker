# Video Poker

En vanlig spillmaskin i store og små casinoer og spillehaller er Video Poker, der en spiller satser penger og forsøker å få best mulig pokerhånd. En hånd deles ut, spilleren kan kaste så mange kort hen ønsker, og hvilken hånd spilleren sitter igjen med avgjør hva gevinsten blir. Spilleren kan velge hvor stor innsatsen skal være, og gevinsten øker i takt med beløpet spilleren har satset.

## Kravspesifikasjon

Skjermbilder
Du skal bruke React Router til å lage minst tre skjermbilder i appen din. Disse skjermbildene er:

- Selve spillet.
- Et skjermbilde der spillets regler forklares for spilleren, sammen med en oversikt over gevinster og utbetalinger. Du kan utvide denne siden med ytterligere informasjon om du vil, f.eks med hvem som har laget appen, lenker til inspirasjon du har brukt, og så videre. Her står du fritt til å utvide som du ønsker.
- Et skjermbilde der det skal være mulig å velge spiller, i tilfelle appen brukes av flere enn én person. Du trenger ikke tenke på passord eller sikkerhet her; det holder med at spilleren identifiserer seg med navn. Det skal være en liste over hvilke spillere som allerede finnes, og en knapp for å opprette en ny spiller. Når en ny spiller opprettes, skal denne få 100 mynter til å starte med.

## Komponenter

Du skal utforme alle delene av grensesnittet ditt som gjenbrukbare React-komponenter. Hvilke komponenter du trenger må du selv finne ut av, men du skal minst lage:

- En spillekortkomponent kalt <Card>
- En tabell med oversikt over gevinster og utbetalinger kalt <PayoutTable>
- En teller der spillerens nåværende antall mynter vises, kalt <TotalCoins>
- En visning av spillerens nåværende innsats, kalt <CurrentBet>
- En visning av hvilken hånd brukeren sitter med akkurat nå (f.eks to par, tre like…). Denne visningen skal bruke en type kalt PokerHand som inneholder alle de forskjellige mulige pokerhendene man kan få i spillet.
- En komponent for hele “spillbrettet” kalt <Game> der alle komponenter samles

## Spillkortkomponenten

Du skal lage en spillkortkomponent som representerer et enkelt kort. Denne komponenten skal lages med CSS. Du kan bruke SVG-ikoner for de fire fargene (kløver/ruter/hjerter/spar) om du vil, og du kan bruke en spesiell font for teksten om du ønsker, men komponenten skal lages med CSS alene. Du skal også lage en variant som viser baksiden av kortet; her kan du bruke en gradient eller lignende, men du skal lage utseendet med CSS. Du skal bruke CSS Grid som layoutmetode når du lager dette kortet. Du står ellers fritt til å designe kortet slik du selv vil.

Du skal lage en type i TypeScript som representerer et spillkort, kalt PlayingCard. Typen skal inneholde hvilken farge og verdi kortet har. Spillkortkomponenten din skal ta i mot en verdi av denne typen som en prop når kortet lages.

Dersom kortets bakside skal vises, kan du velge om du vil gjøre dette med en egen komponent, eller om du vil ha denne logikken som en del av den vanlige spillkortkomponenten. Du skal redegjøre for hvorfor du har valgt å gjøre det på den ene eller den andre måten.
- Vær gjerne kreativ med utseende og funksjonalitet i appen din! Denne oppgaven beskriver minimumsløsningen, men du står fritt til å legge til andre funksjoner hvis du har tid til dette.
