; Questo script viene eseguito durante l'installazione.
; Importa il certificato self-signed nel trusted store di Windows
; in modo che gli aggiornamenti futuri siano riconosciuti come attendibili.

!macro customInstall
  ; Copia il certificato in una directory temporanea
  File /oname=$TEMP\hop-certificate.cer "${BUILD_RESOURCES_DIR}\hop-certificate.cer"

  ; Importa in Trusted Publishers (per la firma dell'eseguibile)
  nsExec::ExecToLog 'certutil -addstore "TrustedPublisher" "$TEMP\hop-certificate.cer"'
  ; Importa in Root CA (per la catena di fiducia)
  nsExec::ExecToLog 'certutil -addstore "Root" "$TEMP\hop-certificate.cer"'

  ; Rimuovi il file temporaneo
  Delete "$TEMP\hop-certificate.cer"
!macroend
