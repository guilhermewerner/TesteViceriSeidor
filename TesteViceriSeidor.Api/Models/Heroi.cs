
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TesteViceriSeidor.Api.Models
{
    [Index(nameof(NomeHeroi), IsUnique = true)]
    public class Heroi
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(120)]
        public string Nome { get; set; }

        [MaxLength(120)]
        public string NomeHeroi { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime DataNascimento { get; set; }

        public float Altura { get; set; }

        public float Peso { get; set; }

        public IEnumerable<Superpoder> Superpoderes { get; set; }

        public Heroi() : this("", "")
        {
        }

        public Heroi(string Nome, string NomeHeroi) : this(Nome, NomeHeroi, new List<Superpoder>())
        {
        }

        public Heroi(string Nome, string NomeHeroi, IEnumerable<Superpoder> Superpoderes)
        {
            this.Id = 0;
            this.Nome = Nome;
            this.NomeHeroi = NomeHeroi;
            this.Superpoderes = Superpoderes;
            this.Altura = 0.0f;
            this.Peso = 0.0f;
        }
    }
}
