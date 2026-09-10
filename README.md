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

## Tilstand

Du skal bruke Zustand som tilstandsverktøy i appen din. Du kan også bruke useState i komponenter der det gir mening, f.eks ved tilstand som bare gjelder internt i en komponent, men alle data som har med spillet å gjøre skal ligge i en Zustand-store. Denne store’n skal minst inneholde følgende data:

- Data om kortstokken som brukes i denne runden av spillet. Når en runde i spillet startes, skal du gå ut fra at du har en fullstendig kortstokk med 52 kort. Denne kortstokken stokkes foran hver runde før kortene så deles ut.
- Data om hvilke kort spilleren sitter med på hånda akkurat nå. Dette er kortene som vises for spilleren i appen.
- Data om hvilke kort spilleren har kastet.
- Hvilken spiller som faktisk spiller, og hvor mange mynter denne spilleren har akkurat nå. Du skal også lage en egen type med TypeScript, kalt Player, som du bruker her.

Du må opprette actions som endrer dataene i store’n ut fra hva du faktisk trenger. Her legger vi ingen føringer, og du kan opprette så mange eller så få actions som du trenger. Du skal også lage alle nødvendige typer du trenger.

Du skal kode appen din sånn at tilstanden persisteres i localStorage. Du må også sørge for at dersom en spiller navigerer seg til et annet skjermbilde midt i en runde, så skal ikke spilleren miste noen mynter eller måtte starte runden på nytt når de kommer tilbake til spillet igjen. Da skal den runden spilleren “gikk fra” fremdeles være aktiv. Det samme gjelder ved reload i nettleseren.

## Utseende og design

Vi legger i praksis ingen føringer for det grafiske designet av appen din, men du må tenke på følgende:

- Appen skal kunne brukes uansett enhet og orientering av enheten, slik at den må fungere godt både på mobil og på vanlig desktopskjerm.
- Ikke bruk mye tid på animasjoner og visuelle effekter. Dette kan du se på når kjernefunksjonaliteten til appen er klar, om du ønsker det, men det er “nice to have” mer enn det er “need to have”. Det samme gjelder bruk av lyd og andre effekter.
- Du skal følge vanlige regler for universell utforming av appen din; spesielt skal det være mulig å bruke appen din med og uten mus/touch, f.eks ved å bare navigere med tastatur og tabbing.

## Annet

- Du skal bruke Git og GitHub aktivt når du lager appen. Du bør starte med å lage deg et repository, og deretter bruke branching slik du har lært når du lager ny funksjonalitet. Vi forventer å kunne gå gjennom Git-historikken din for å se hvordan appen har blitt utviklet over tid, og vi forventer riktig bruk av branching.
- Vi ønsker at du modulariserer appen din og skiller ut funksjonalitet fra komponenter der det er hensiktsmessig. Komponentene dine bør være små og effektive med minst mulig kode; hvis en funksjon blir veldig mange linjer bør den kanskje leve i en egen fil og heller importeres. Vi forventer også at du kommenterer og forklarer hva hver enkelt funksjon i appen din gjør, ikke nødvendigvis steg for steg men i det minste dens hensikt, argumenter og returverdi.
- Vær gjerne kreativ med utseende og funksjonalitet i appen din! Denne oppgaven beskriver minimumsløsningen, men du står fritt til å legge til andre funksjoner hvis du har tid til dette.
