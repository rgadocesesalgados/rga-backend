const { exec } = require('child_process')

process.stdout.write('\n\n🔴 Aguardando conexão postgres')

checkPostgresConnection()

function checkPostgresConnection() {
  exec('docker exec rga-postgres pg_isready', (error, stdout) => {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.')
      return checkPostgresConnection()
    }

    process.stdout.write('\n🟢 Postgres está aceitando conexões\n\n')
  })
}
