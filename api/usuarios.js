const supabase = require('../lib/supabase')

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('usuarios').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { nombre, email, edad } = req.body
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, email, edad }])
      .select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data[0])
  }

  res.status(405).json({ message: 'Método no permitido' })
}